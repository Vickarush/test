import React, { useState, useEffect } from "react";
import { View, Text, Button } from 'react-native';
import Axios from "axios";
import { Link } from "expo-router";

export default function Articles() {
  // Track state for posts, current page and number of pages
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [nrofpages, setNumberofpage] = useState(1);

  // When the page number changes call the api for posts.
  useEffect(() => {
    Axios.get("https://nscc.org.ng/wp-json/wp/v2/posts/", {
      params: { page: page }
    }).then(response => {
      // Store the number of posible pages.
      setNumberofpage(response.headers["x-wp-totalpages"]);
      // Store the posts from the response.
      setPosts(response.data);
    });
  }, [page, setPosts]);

  // Event handler: Decrease page count no lower then 1.
  const handlePrevPage = () => setPage(page - 1 ? page - 1 : 1);
  // Event handler: Increase page count no higher then nrofpages.
  const handleNextPage = () => setPage(page < nrofpages ? page + 1 : nrofpages);

  return (
    <View>
      <Text>Navigate Wp Rest Api Posts</Text>

      <View>
        <Button onPress={ ()=> handlePrevPage}>Newer posts</Button>
       
          <Text>Page {page} of {nrofpages}</Text>
        
        <Button onPress={()=> handleNextPage}>Older posts</Button>
      </View>

      <View>
        {posts &&
          posts.length &&
          posts.map((post, index) => {
            return (
              <View key={post.id}>
                <Text>{post.title.rendered}</Text>
                <Text>
                {{ __html: post.excerpt.rendered }}
                {post.link}
                </Text>
               
              </View>
            );
          })}
      </View>
    </View>
  );
}