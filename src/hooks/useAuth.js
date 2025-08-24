import { useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import { upsertUserToDB } from "./useUpsertUser";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get the current session (Supabase v2)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);

    async function signInWithGithub() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                queryParams: {
                    prompt: 'login'
                }
            }
        });
        if (error) {
            console.error('GitHub sign-in error:', error);
            return;
        }
    }
    
    useEffect(() => {
        if (user) {
            upsertUserToDB(user);
        }
    }, [user]);


    async function signOut() {
        try {
            await supabase.auth.signOut();
        } catch (e) {
            // ignore error, fallback to local clear 
        }
        setUser(null);
        localStorage.clear();
        window.location.reload();
    }

    return { user, signInWithGithub, signOut, loading };
}
