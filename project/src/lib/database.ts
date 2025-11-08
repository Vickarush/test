import { supabase } from './supabase';

export interface Member {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  graduation_year: number | null;
  house_color: string;
  current_occupation: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('last_name', { ascending: true });

  if (error) {
    if (error.code === '42P01') {
      throw new Error('Database table not found. Please run the setup SQL script in your Supabase dashboard.');
    }
    throw new Error(error.message || 'Failed to load members');
  }

  return data || [];
}

export async function addMember(member: Omit<Member, 'id' | 'created_at' | 'updated_at'>): Promise<Member> {
  const { data, error } = await supabase
    .from('members')
    .insert([member])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('A member with this email already exists.');
    }
    throw error;
  }

  return data as Member;
}

export async function updateMember(id: string, updates: Partial<Member>): Promise<void> {
  const { error } = await supabase
    .from('members')
    .update(updates)
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export async function deleteMember(id: string): Promise<void> {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
