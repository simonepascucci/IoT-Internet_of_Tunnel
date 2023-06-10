import boto3

def lambda_handler(event, context):
    # Initialize DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('tunnelDB')

    # Scan the table to get all items
    response = table.scan()

    # Get the item with the latest timestamp
    latest_item = max(response['Items'], key=lambda x: x['timestamp'])

    return latest_item
