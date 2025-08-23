import { useEffect } from 'react';
import { supabase } from '../api/supabaseClient';

// Upsert user info into Supabase users table
export async function upsertUserToDB(user) {
    if (!user) return;
    const { id, email, user_metadata } = user;
    const username = user_metadata?.user_name || null;
    const full_name = user_metadata?.full_name || user_metadata?.name || null;
    const created_at = user_metadata?.created_at || new Date().toISOString();
    const updated_at = user_metadata?.updated_at || new Date().toISOString();

    // Check if user with this email already exists
    const { data: existingUsers, error: selectError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email);

    if (selectError) {
        console.error('Error checking existing user:', selectError);
        return;
    }

    if (!existingUsers || existingUsers.length === 0) {
        // Only insert if not present
        const insert = {
            id,
            username,
            full_name,
            email,
            is_active: false,
            created_at,
            updated_at,
        };
        const { error } = await supabase.from('users').insert(insert);
        if (error) console.error('Error inserting user:', error);
        else console.log('User inserted successfully:', insert);
    } else {
        // Optionally update is_active/updated_at for existing user
        const { error } = await supabase.from('users').update({ is_active: true, updated_at }).eq('email', email);
        if (error) console.error('Error updating user:', error);
    }
}

export function useUpsertUser(user) {
    useEffect(() => {
        if (user) upsertUserToDB(user);
    }, [user]);
}
