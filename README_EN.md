# Supabase Heartbeat

[中文](./README.md)

🔄 Automatically ping your Supabase database periodically to keep the free tier project active.

## Features

- Automatically runs every Monday and Thursday at UTC 9:00
- Supports manual triggering
- Queries the `user` table to keep the database active
- Prevents free tier Supabase databases from pausing due to inactivity (7 days)

## Quick Start

1. **Fork this Repository**
   - Click the "Fork" button in the top right corner of the page.
   - This will create a copy under your GitHub account.

2. **Configure GitHub Secrets** (in your forked repository)
   
   Go to `Settings` → `Secrets and variables` → `Actions`, and add:
   
   - `SUPABASE_URL`: Your Supabase Project URL
   - `SUPABASE_KEY`: Your Supabase API Key
   - `TABLE_NAME` (Optional): The table name to ping (default is `user`)
   
   > 💡 Find these in Supabase Dashboard:
   > - **SUPABASE_URL**: `Project Settings` → `Data API` → `Project URL` → `URL`
   > - **SUPABASE_KEY**: `Project Settings` → `API Keys` → `Publishable key` "anon" "public"

3. **Enable GitHub Actions**
   
   - Go to the "Actions" tab in your forked repository.
   - Click "I understand my workflows, go ahead and enable them".

4. **Test Run**
   
   - Click on the "Ping Supabase Database" workflow in the Actions page.
   - Click "Run workflow" → "Run workflow" button.
   - Check the run logs to confirm success ✅.

## Workflow Details

- **Trigger Schedule**: 
  - Automatic: Every Monday and Thursday at UTC 9:00
  - Manual: Can be triggered manually on the GitHub Actions page
  
- **Execution Steps**:
  1. Install dependencies (`npm install @supabase/supabase-js`)
  2. Run `node index.js`
  3. Query the specified table (default `user`)

## Important Notes

⚠️ **Important**: 
- Ensure your Supabase project has a `user` table, or configure `TABLE_NAME` Secret to specify another table.
- If the table name is different, it is recommended to use the Secret configuration instead of modifying the code.
- Free tier Supabase databases pause after 7 days of inactivity.

## License

MIT
