const { createClient } = require('@supabase/supabase-js');

function printError(err) {
    console.error('❌ Ping failed:', err.message || err);
    if (err.code) console.error('🧩 Error code:', err.code);
    if (err.details) console.error('🔍 Error details:', err.details);
    if (err.hint) console.error('💡 Hint:', err.hint);
    if (err.cause && err.cause.code) console.error('🧩 Root cause:', err.cause.code);
}

async function pingSupabase() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const tableName = process.env.TABLE_NAME || 'user';

    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_KEY');
        console.error('💡 Please check GitHub Actions Secrets');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔄 Starting Supabase heartbeat...');
    console.log('⏰ Time:', new Date().toISOString());
    console.log('🎯 Target table:', tableName);

    try {
        const { data, error } = await supabase.from(tableName).select('id').limit(1);

        if (error) {
            throw error;
        }

        console.log('✅ Ping successful!');
        console.log('📊 Records found:', data ? data.length : 0);
        console.log('🎉 Database is active');
    } catch (err) {
        printError(err);

        if (err.code === 'PGRST204' || err.code === '42P01') {
            console.error(`⚠️ Note: The table "${tableName}" does not exist.`);
            console.error('👉 Please set TABLE_NAME to an existing table in GitHub Variables.');
        } else if (err.code === '42501') {
            console.error(`⚠️ Note: Permission denied for table "${tableName}".`);
            console.error('👉 Ensure the anon/public role has SELECT permission.');
        }

        if (err.code === 'ENOTFOUND' || (err.cause && err.cause.code === 'ENOTFOUND')) {
            console.error('⚠️ Note: Could not resolve Supabase URL. Check SUPABASE_URL in GitHub Secrets.');
        }

        process.exit(1);
    }
}

pingSupabase();
