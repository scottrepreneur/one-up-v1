import React from 'react';
import {
  Box, Input, Button, Flex, Stack, Heading,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useUser } from '../../contexts/UserContext';
import { ActivityRecord } from '../../utils';

const ActivityCreate: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const { activities } = useUser();
  const usedKeys = activities?.map((a: ActivityRecord) => a.activity);

  const onSubmit = (data: any) => console.log(data);

  const activityFields = [
    [
      { label: 'Name', key: 'name', placeholder: 'Walk the dog' },
      {
        label: 'ID',
        key: 'activity',
        placeholder: 'dog-walk',
        hint: 'lowercase, no spaces or special characters. hyphen only.',
        validation: (value: any): boolean => !usedKeys.includes(value),
      },
    ],
    [
      { label: 'Type', key: 'type', placeholder: 'chain' },
      { label: 'Category', key: 'category', placeholder: 'home' },
    ],
    [
      { label: 'Frequency', key: 'frequency', placeholder: '1' },
      { label: 'Frequency Period', key: 'frequencyPeriod', placeholder: 'day' },
    ],
    [
      { label: 'Cooldown', key: 'cooldown', placeholder: '360' },
      { label: 'Points', key: 'points', placeholder: '2' },
    ],
  ];

  return (
    <Box w='70%' m='0 auto'>
      <Heading size='md' fontWeight={700} textAlign='center' mt={25} color='white' mb={6}>Create a New Activity</Heading>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <Box as='form' onSubmit={handleSubmit(onSubmit)} w='80%' m='0 auto'>
        {/* register your input into the hook by invoking the "register" function */}
        <Stack spacing={4} w='100%'>
          {activityFields.map((row) => (
            <Flex w='100%' justify='space-between' key={row[0].label}>
              {row.map((field) => (
                <Stack key={field.key} spacing={2} w='40%'>
                  <Box color='white'>{field.label}</Box>
                  <Input
                    name={field.key}
                    placeholder={field.placeholder}
                    ref={field.validation ? register({ validate: field.validation }) : register}
                  />
                  <Box color='white' fontSize='xs'>{field.hint}</Box>
                </Stack>
              ))}
            </Flex>

          ))}
        </Stack>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <Flex justify='flex-end' my={6}>
          <Button variant='primary' type='submit'>Submit</Button>
        </Flex>

      </Box>
    </Box>
  );
};

export default ActivityCreate;
