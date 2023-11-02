import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { infer as zodInfer } from 'zod';

import { API } from 'aws-amplify';
import axios from 'axios';
import { FormSchema } from '@/schemas/FormSchema';
import { FormInstance } from '../common/FormInstance';

const SnapshotInstanceContent = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const form = useForm<zodInfer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      instanceId: ''
    }
  });
  const onSubmit = async (values: zodInfer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const snapshotId = await API.post('main', '/ec2/snapshot', {
        body: values
      });
      setMessage(`Saving a snapshot under the snapshot ID ${snapshotId}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setMessage(e.response?.data);
      } else {
        setMessage('Unknown error');
      }
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <FormInstance
        form={form}
        onSubmit={onSubmit}
        loading={loading}
        description="This is the instance ID you want to restore. It will work only if it has been snapshoted before. Only one backup is stored per instance ID."
      />
      {message && <p>{message}</p>}
    </div>
  );
};

export default SnapshotInstanceContent;
