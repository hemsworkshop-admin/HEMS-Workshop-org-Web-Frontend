import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execAsync = util.promisify(exec);

export async function POST(request: Request) {
  try {
    // Navigate from src/frontend up to the project root
    const projectRoot = path.join(process.cwd(), '..', '..');

    // 1. Git Add
    await execAsync('git add .', { cwd: projectRoot });
    
    // 2. Git Commit
    try {
      await execAsync('git commit -m "feat(data): workshop manager content update"', { cwd: projectRoot });
    } catch (commitErr: any) {
      if (!commitErr.message.includes('nothing to commit') && !commitErr.message.includes('working tree clean')) {
        throw commitErr;
      }
    }
    
    // 3. Git Push
    await execAsync('git push origin main', { cwd: projectRoot });

    // 4. GCloud Sync
    // Sync the proceedings directory to the expected GCS bucket
    const gcloudCmd = 'gsutil rsync -r docs/archives_translation/proceedings gs://hems-workshop-archives/proceedings';
    let gcloudLog = '';
    try {
      const { stdout } = await execAsync(gcloudCmd, { cwd: projectRoot });
      gcloudLog = stdout;
    } catch (gcloudErr: any) {
      console.warn('GCloud Sync failed (gsutil may not be installed or authenticated):', gcloudErr.message);
      gcloudLog = 'GCloud Sync failed: ' + gcloudErr.message;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Git push completed successfully',
      gcloudLog 
    });
  } catch (error: any) {
    console.error('Push Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
