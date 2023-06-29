export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3NTU3NmJjNC02NWNmLTRlNWMtYWQxMy1lMzIxMzRiNjkzNDIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NzE4NTU0MywiZXhwIjoxNzE4NzIxNTQzfQ.16FAL28SfsITp6XM6VEH2MtExn3mS6lUKDLm8gDqS54'; // token should be in String format
//Secret 46a4f559207b50dce4c14049a043257f1c55350ba42f0ad4db381e6573de190f

// API call to create meeting
export const createMeeting = async ({token}) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const {roomId} = await res.json();
  console.log('room id', roomId);
  return roomId;
};


