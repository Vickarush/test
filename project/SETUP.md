# Database Setup Instructions

This application uses Supabase as its database. Before the app will work, you need to set up the database table.

## Your Supabase Project

**Project URL:** `https://0ec90b57d6e95fcbda19832f.supabase.co`
**Reference ID:** `0ec90b57d6e95fcbda19832f`

## Quick Setup (5 minutes)

### Step 1: Access Supabase SQL Editor

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Find your project (reference ID: `0ec90b57d6e95fcbda19832f`)
4. Click on "SQL Editor" in the left sidebar

### Step 2: Run the Setup Script

1. Click "New Query" in the SQL Editor
2. Copy the entire contents of the `database-setup.sql` file from this project
3. Paste it into the SQL Editor
4. Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac)

### Step 3: Verify Setup

You should see a success message. The script creates:
- A `members` table with all required fields including title
- Proper indexes for fast searches
- Row Level Security (RLS) policies for public access
- An automatic timestamp updater

### Step 4: Test the Application

Refresh your application. You should now be able to:
- Add new members
- View all members
- Update member information
- Delete members
- Export data to CSV

## Troubleshooting

**"Database table not found" error:**
- Make sure you ran the SQL script in Step 2
- Check that you're connected to the correct Supabase project
- Verify the `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**"No members found" when sharing:**
- This is normal if the database is empty
- Add some test members to verify sharing works
- All users accessing the app will see the same member list

**Permission errors:**
- The RLS policies allow public read/write access by default
- If you need to restrict access, modify the policies in `database-setup.sql`

## What the Database Stores

The members table includes:
- **Title**: Mr, Mrs, Ms, Dr, Prof, Rev, Chief, Engr, etc.
- **Name**: First and last name
- **Contact**: Email and phone number
- **Address**: Residential address
- **Graduation Year**: Year graduated
- **House Color**: House affiliation
- **Occupation**: Current job/occupation
- **Status**: Active or inactive membership
- **Timestamps**: Created and updated dates

## Security Notes

The current setup allows anyone with the app URL to:
- View all members
- Add new members
- Update existing members
- Delete members

This is suitable for internal organization use. If you need authentication or restricted access, you'll need to add authentication and modify the RLS policies.
