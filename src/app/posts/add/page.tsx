'use client';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../../../server/posts';

import React, { useEffect, useState } from 'react'
import { List, Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string; // Adjust to match your API data structure
};

const AddBlog = () => {
    const [pagination, setPagination] = useState({
      currentPage: 1,
      perPage: 10,
    })
    const [totalPage, setTotalPage] = useState(0);
    const [allBlogpost, setAllBlogPost] = useState<Post[]>([])
    const {status, data} = useQuery({
        queryKey: ["posts", pagination], // Unique key for the query
        queryFn: () => getAllPosts(pagination).then(function(test) {
          setTotalPage(test.headers['X-Pagination-Total']); 
          setAllBlogPost([...test.data])
          return test.data
        }), // The function to fetch data
    });
    
    return (
      <main 
        className='ma-5'
      >
        <List
          grid={{
            gutter: 16,
            column: 1, // Adjust for responsiveness
          }}
          dataSource={allBlogpost}
          renderItem={(item: Post) => (
            <List.Item>
              <Card
                bordered={false}
                title={<span className="text-lg font-semibold">{item.title}</span>}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg mx-7 my-5"
                extra={(
                  <div className="flex gap-2">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      size="small"
                      // onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      // onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              >
                <p className="text-gray-700">{item.body}</p>
              </Card>
            </List.Item>
          )}
        />
      </main>
    )
}

export default AddBlog