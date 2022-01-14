import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const queryRecord = (
  params: any,
): Promise<{
  Items: any[];
  Count: number;
  ScannedCount: number;
}> =>
  new Promise((resolve, reject) => {
    dynamoDb.query(params, (error: any, data: any) =>
      error ? reject(error) : resolve(data),
    );
  });

export const addRecord = (params: any): Promise<any> =>
  new Promise((resolve, reject) => {
    dynamoDb.put(params, (error: any, data: any) =>
      error ? reject(error) : resolve(data),
    );
  });

export const updateRecord = async (params: any): Promise<any> =>
  new Promise((resolve, reject) => {
    dynamoDb.update(params, (error: any, data: any) =>
      error ? reject(error) : resolve(data),
    );
  });
