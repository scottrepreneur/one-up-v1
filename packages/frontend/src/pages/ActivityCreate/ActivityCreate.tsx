import React, { FunctionComponent } from 'react';
import {
  Box, Text, Input, Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useUser } from '../../contexts/UserContext';
import { ActivityRecord } from '../../utils';

const ActivityCreate: FunctionComponent = () => {
  const { register, handleSubmit, errors } = useForm();
  const { activities } = useUser();
  const usedKeys = activities?.map((a: ActivityRecord) => a.activity);

  const onSubmit = (data: any) => console.log(data);

  return (
    <Box w='70%' m='0 auto'>
      <Text fontSize='xl' fontWeight={700} textAlign='center' mt={25} color='white'>Create a New Activity</Text>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <Box color='white'>
          Activity Name:
          <Input
            name='activityName'
            placeholder='Complete a Pomodoro'
            ref={register}
          />
        </Box>

        {/* include validation with required or other standard HTML validation rules */}
        <Box>
          <Text color='white'>Activity Key:</Text>
          <Text color='white'>lowercase, no spaces or special characters. hyphen only.</Text>
          <Input
            name='activityKey'
            placeholder='clean-dishes'
            ref={register({ validate: (value) => !usedKeys.includes(value) })}
          />
        </Box>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Button variant='solid' color='blue' type='submit'>Submit</Button>
      </form>
    </Box>
  );
};

export default ActivityCreate;
