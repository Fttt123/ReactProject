import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

const GetVk = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try{
        const response =await axios.get('/method/wall.get?access_token=1080c6a51080c6a51080c6a50c139655bb110801080c6a575f39195190c96f4badc66d1&domain=ourkrd&count=10&v=5.199');
        console.log(response.data);
        const data = await response.data;
        console.log(data);
        setPosts(data.response.items);
      }catch (error){
        console.error('Ошибка: ',error);
      }
      };
      fetchPosts();
  }, []);

  const renderAttachment = (attachment) => {
    if(attachment.type === 'photo'){
      return <img src={attachment.photo.sizes[2].url} alt="Post Photo"/>;
    } else if(attachment.type === 'video') {
      return <video src={attachment.track_code} controls/>;
    }
    else{
      return null;
    }
  };

  return(
    <div align = "center" className="vk-widget">
      <h2>посты сообщества ВК</h2>
      <ul className="post-list">
      {posts.map((post)=>(
        <li className="post-item" key ={post.hash}>
          <div className="post-text">{post.text}</div>
          <br/>
          {post.attachments && post.attachments.map((attachment) => (
            <div key={attachment.type} className="post-attachment">{renderAttachment(attachment)}</div>
          ))}
        </li>
      ))}
      </ul>
    </div>
  )
};

export default GetVk;