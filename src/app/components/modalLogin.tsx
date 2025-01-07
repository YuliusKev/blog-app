'use client';
import { useMutation } from '@tanstack/react-query';
import { Modal, Button, Form, Input, InputRef, FormProps, notification} from 'antd';
import React, { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { getUser } from '../../../server/users';
import { useRouter } from 'next/navigation'

const modalLogin = () => {
    const router = useRouter();
    const usernameRef = React.useRef<InputRef>(null)
    const tokenRef = React.useRef<InputRef>(null)
    const {status, error, mutate} = useMutation({
        mutationFn: getUser,
        onError: () => {
            notification.error({
                message: 'Error',
                description: `Your Token was not valid. Please try again`,
            });
        },
        onSuccess: () => {
            notification.success({
                message: 'Sucess',
                description: `Hello ${usernameRef.current?.input?.value}`,
            });
            setIsOpen(false)
            const token = atob(`${tokenRef.current?.input?.value}`)
            localStorage.setItem('login', token)
            router.push("/posts") 
        }
    })
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(false)

    const submitUser: FormProps['onFinish'] = (event) => {
        const username = usernameRef.current?.input?.value;
        const token = tokenRef.current?.input?.value;
        
        if(username && token){
            mutate({
                username,
                token
            })
        }
      };

    useEffect(() => {
        setIsOpen(true);
      }, [])

    return (
        <Modal 
            title="Selamat Datang di Blog App!" 
            open={isOpen} 
            closable={false}
            footer={[
            ]}
        >
            <Form form={form} layout="vertical" onFinish={submitUser}>
                <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Masukkan nama anda" ref={usernameRef}/>
                </Form.Item>

                <Form.Item
                label="GoRest Token"
                name="token"
                rules={[
                    { required: true, message: 'GoRest token tidak boleh' },
                ]}
                >
                    <Input.Password placeholder="Masukkan token GoRest API anda" ref={tokenRef}/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default modalLogin