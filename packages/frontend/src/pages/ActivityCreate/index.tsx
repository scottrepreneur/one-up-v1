import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { useUserDbData } from '../../contexts/Application';
import { ActivityRecord } from '../../utils';

const Wrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 25px;
`;

const ActivityForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.input``;

const ActivityCreate: FunctionComponent = () => {
  const { register, handleSubmit, errors } = useForm();
  const dbData = useUserDbData();
  const activities = dbData?.activities && JSON.parse(dbData?.activities);
  console.log(activities);
  const usedKeys = activities?.map((a: ActivityRecord) => {
    return a.activity;
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Wrapper>
      <Heading>Create a New Activity</Heading>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <ActivityForm onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          Activity Name:
          <input
            name='activityName'
            placeholder='Complete a Pomodoro'
            ref={register}
          />
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div>
          Activity Key:
          <sub>lowercase, no spaces or special characters. hyphen only.</sub>
          <input
            name='activityKey'
            ref={register({ validate: (value) => !usedKeys.includes(value) })}
          />
        </div>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <SubmitButton type='submit' />
      </ActivityForm>
    </Wrapper>
  );
};

export default ActivityCreate;
