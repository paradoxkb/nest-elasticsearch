export default {
    elasticSearchUrl: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    rabbitMqUrl: process.env.RABBITMQ_URL || 'amqp://localhost:5672'
}
