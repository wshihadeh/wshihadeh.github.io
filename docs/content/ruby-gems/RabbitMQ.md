# RabbitMQ

```sh
 ____       _     _     _ _   __  __  ___     ____ _ _            _
|  _ \ __ _| |__ | |__ (_) |_|  \/  |/ _ \   / ___| (_) ___ _ __ | |_
| |_) / _` | '_ \| '_ \| | __| |\/| | | | | | |   | | |/ _ \ '_ \| __|
|  _ < (_| | |_) | |_) | | |_| |  | | |_| | | |___| | |  __/ | | | |_
|_| \_\__,_|_.__/|_.__/|_|\__|_|  |_|\__\_\  \____|_|_|\___|_| |_|\__|

```

[![Gem Version](https://badge.fury.io/rb/rabbitmq_client.svg)](https://badge.fury.io/rb/rabbitmq_client)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/wshihadeh/rabbitmq_client.svg?branch=master)](https://travis-ci.com/wshihadeh/rabbitmq_client)
[![Depfu](https://badges.depfu.com/badges/b7ffc2788d24431bf85864706c5f9fb2/count.svg)](https://depfu.com/github/wshihadeh/rabbitmq_client?project_id=9862)
[![RubyCritic](https://wshihadeh.github.io/rabbitmq_client/badges/rubycritic_badge_score.svg)](https://wshihadeh.github.io/rabbitmq_client/rubycritic/overview.html)

Simplifying RabbitMQ for Ruby apps!

RabbitMQ Client is a ruby client library for applications dealing with [RabbitMQ](https://www.rabbitmq.com/).

- It wraps common behaviors needed by publishers and subscribers in an easy and convenient API.
- It uses both `bunny` and `connection_pool` to manage RabbitMQ communications.
- It is extendable using plugins.

  Why RabbitMQ Client? Why not `bunny` and `connection_pool` directly? Well, gems are just a clients. You still need to write a lot of code to manage proper subscribing and publishing of messages. You need to do error handling, passing request headers  to RabbitMQ and maybe logging/instrumenting the message management process. Finally, you also need to consider how to deploy your app and how to start it.

With RabbitMQ Client by your side, all this becomes smooth and easy.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'rabbitmq_client'
```

And then execute:

```sh
$~> bundle
```

Or install it yourself as:

```sh
$~> gem install rabbitmq_client
```

## Usage

RabbitMQ Client can be used to publsih and subscribe RabbitMQ messages.

## Configurations

RabbitMQ Client support the following configurations

| Configuration  | Description | Default Value |
|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| rabbitmq_url | RabbitMQ server URL | amqp://guest:guest@127.0.0.1:5672 |
| logger_configs.logs_format | RabbitmqClient logs format.<br>values can be either json or plain | plain |
| logger_configs.logs_level | RabbitmqClient logs level.<br>values can be one of :debug, :info, :error | info |
| logger_configs.logs_filename | Logs file name, if nil STOUT will be used | nil |
| logger_configs.logger | Logger object, if nil STOUT logger will created | nil |
| session_params.heartbeat_publisher | Heartbeat interval for publisher sessions.<br>0 means no heartbeat | 0 |
| session_params.session_pool | Number of sessions with rabbitmq | 1 |
| plugins | Array of used plugins | [] |
| global_store | Global Store used to store tags and headers: <br>[RequestHeaderMiddleware](https://github.com/fidor/request_headers_middleware)<br>[RequestStore](https://github.com/steveklabnik/request_store) | nil |
| whitelist | List of whitelisted headers | ['x-request-id'.to_sym] |

### Full Configuration Example

```ruby
RabbitmqClient.configure do |config|
  config.rabbitmq_url = "${rabbitmq_url}"
  config.logger_configs = {
    logs_format: 'plain',
    logs_level: :info,
    logs_filename: nil,
    logger: nil
  }
  config.session_params = {
    heartbeat_publisher: 0,
    session_pool: 1
  }
  config.plugins = []
  config.global_store = RequestHeaderMiddleware
  config.whitelist =  ['x-request-id'.to_sym]
end
```

#### Append plungins or whitelist items

```ruby
 RabbitmqClient.plugins << MYRabbitmqClientPlugin
 RabbitmqClient.whitelist << :white_listed_header_key
```

## Publishing messages to RabbitMQ

- Publish messages using RabbitmqClient singleton publisher

```ruby
  # RabbitmqClient.add_exchange(exchange, type, options)
  RabbitmqClient.add_exchange('default.rabbitmq_client', :topic, {})
  # RabbitmqClient.publish(payload, options)
  RabbitmqClient.publish({id: 10, name: 'rabbitmq_client'}, { exchange_name: 'default.rabbitmq_client' })
```

- Create a publisher and use it

```ruby
  config = {
    rabbitmq_url: val,
    exchange_registry: val,
    session_params: { heartbeat_publisher: val }
  }
 publisher = RabbitmqClient::Publisher.new(config)
 publisher.publish(payload, options)
```

## Plugins

RabbitmqClient plugins are classes that define a callbacks that can be executed before or after events that occuers during RabbitmqClient lifecycle.
Current supprted lifecycle events are:

- publish: occure when publishing a massage is triggered.

Here is an example where we define a plugin to add some headers to message options before publishing the message.

```ruby
  class MQTestPlugin < RabbitmqClient::Plugin
    callbacks do |lifecycle|
      lifecycle.before(:publish) do |_message, options|
        options[:headers] = { test_key:  'test'}
      end
    end
  end
  RabbitmqClient.plugins << MQTestPlugin
```
