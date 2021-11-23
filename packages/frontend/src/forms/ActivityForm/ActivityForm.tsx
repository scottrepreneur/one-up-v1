import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Flex, Stack, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router';
import { useOverlay } from '../../contexts/OverlayContext';
import { ActivityRecord } from '../../utils';

interface ActivityFormProps {
  activity?: any;
  activities: any[];
  updateActivity?: any;
  createActivity?: any;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  activities,
  updateActivity,
  createActivity,
}: ActivityFormProps) => {
  const { register, handleSubmit, errors } = useForm();
  const { successToast, errorToast } = useOverlay();
  const history = useHistory();
  const usedKeys = activities?.map((a: ActivityRecord) => a.activity);
  const [activityData, setActivityData] = useState<{ [key: string]: string }>();
  // console.log(activities);
  useEffect(() => {
    if (activity && activities) {
      const localData = activities.filter((a) => a.activity === activity);
      if (localData.length) {
        setActivityData(localData[0]);
      }
    }
  }, [activity, activities]);

  const activityFields = [
    [
      { label: 'Name', key: 'name', placeholder: 'Walk the dog' },
      {
        label: 'ID',
        key: 'activity',
        placeholder: 'dog-walk',
        hint: 'lowercase, no spaces or special characters. hyphen only.',
        validation: (value: any): boolean =>
          activity ? usedKeys.includes(value) : !usedKeys.includes(value),
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

  interface ActivityFieldProps {
    key: string;
    label: string;
    placeholder?: string;
    validation?: any;
    hint?: string;
  }

  const onSubmit = async (data: any) => {
    console.log(activity);
    console.log(data);
    if (activity) {
      const result = await updateActivity(data);
      console.log(result);
      if (!result.error) {
        // return task name
        successToast({
          title: 'Updated Activity',
          description: `Updated ${result.name}`,
        });
      } else {
        errorToast({
          title: 'Error updating activity',
        });
      }
    } else {
      const result = await createActivity(data);

      if (!result.error) {
        successToast({
          title: 'Created Activity',
          description: '',
        });
      } else {
        errorToast({
          title: 'Error',
          description: result.error,
        });
      }
    }
  };

  const onCancel = () =>
    activity
      ? history.push(`/activity/${activity}`)
      : history.push('/activity/list');

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} w='80%' m='0 auto'>
      <Stack spacing={4} w='100%'>
        {activityFields.map((row) => (
          <Flex w='100%' justify='space-between' key={row[0].label}>
            {row.map((field: ActivityFieldProps) => {
              const defaultValue: string =
                activityData && field.key in activityData
                  ? activityData[field.key]
                  : '';
              return (
                <Stack key={field.key} spacing={2} w='40%'>
                  <Box color='white'>{field.label}</Box>
                  <Input
                    name={field.key}
                    placeholder={field.placeholder}
                    defaultValue={defaultValue}
                    ref={
                      field.validation
                        ? register({ validate: field.validation })
                        : register
                    }
                  />
                  <Box color='white' fontSize='xs'>
                    {field.hint}
                  </Box>
                </Stack>
              );
            })}
          </Flex>
        ))}
      </Stack>
      {errors && <span>{errors[0]?.msg}</span>}

      <Flex justify='flex-end' my={6}>
        <HStack spacing={6}>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            {activity ? 'Update' : 'Create'}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ActivityForm;
