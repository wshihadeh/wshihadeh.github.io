# Docker Metadata

A Fluentd filter plugin to attach docker swarm metadata such as service name and container name to the fluentd messages.

## Installation

!!! tip "Gemfile content"

    Add this line to your application's Gemfile:

    ```ruby
    gem 'fluent-plugin-filter-docker_metadata'
    ```

And then execute:

```sh
$~> bundle install
```

Or install it yourself as:

```sh
$~> gem install fluent-plugin-filter-docker_metadata
```

## Configurations

| Configuration Ite | Description |
|-|-|
| docker_url | The docker docket URL. Default value is `unix:///var/run/docker.sock`|
| container_id_regexp | A regex to match the docker container ID. Default is `(\w{64})` |
| labels | A list of key-value pairs to generate extra labels form the defined docker swarm labels |
| keys_delimiter | The character used to separate the labels keys defined in `labels`. The default value is `,`|
| values_delimiter | The character used to separate the keys and values defined in `labels`. The default value is `:` |
| image_name | A boolean value that indicates including the image name or not in the generated event. The default value is `false` |
| image_id | A boolean value that indicates including the image ID or not in the generated event Default value is `false` |

## Configuration Examples

Extract default docker metadata and attach it to the fulentD messages.

```yaml tab="Configuration"
<source>
  @type tail
  @id in_tail_container_logs
  path /var/lib/docker/containers/*/*-json.log
  pos_file /fluentd/log/containers.log.pos
  time_format "%Y-%m-%dT%H:%M:%S.%L%Z"
  time_key time
  read_from_head true
  tag "docker.*"
  format json
</source>

<filter docker.var.lib.docker.containers.*.*.log>
  @type docker_metadata
</filter>
```

```yaml tab="Input"
{
  "log":"2020-06-27 18:47:13 [INFO] Started Successfully",
  "stream":"stderr",
  "time":"2020-06-27T16:47:13.952355891Z"
}
```

```yaml tab="Output"
{
  "log":"2020-06-27 18:47:13 [INFO] Started Successfully",
  "stream":"stderr",
  "container_id": "299d81cacec6c3d6c5077c4dfc60254160869c832f0668f9dd414d11032127e5",
  "container_name": "redis_web.1.f0cdb8tvkmnuvfuj8w4dujits",
  "container_hostname": "299d81cacec6",
  "time":"2020-06-27T16:47:13.952355891Z"
}
```

Extract default docker metadata, docker image name and keys form docker swarm lables.

```yaml tab="Configuration"
<source>
  @type tail
  @id in_tail_container_logs
  path /var/lib/docker/containers/*/*-json.log
  pos_file /fluentd/log/containers.log.pos
  time_format "%Y-%m-%dT%H:%M:%S.%L%Z"
  time_key time
  read_from_head true
  tag "docker.*"
  format json
</source>

<filter docker.var.lib.docker.containers.*.*.log>
  @type docker_metadata
  labels com.docker.stack.namespace:namespace,com.docker.swarm.service.name:service_name,com.docker.swarm.node.id:node_id
</filter>
```

```yaml tab="Input"
{
  "log":"2020-06-27 18:47:13 [INFO] Started Successfully",
  "stream":"stderr",
  "time":"2020-06-27T16:47:13.952355891Z"
}
```

```yaml tab="Output"
{
  "log":"2020-06-27 18:47:13 [INFO] Started Successfully",
  "stream":"stderr",
  "container_id": "299d81cacec6c3d6c5077c4dfc60254160869c832f0668f9dd414d11032127e5",
  "container_name": "redis_web.1.f0cdb8tvkmnuvfuj8w4dujits",
  "container_hostname": "299d81cacec6",
  "namespace": "redis_web",
  "node_id": "286enn745vela3gdmw4piig0d",
  "service_name": "redis_web",
  "time":"2020-06-27T16:47:13.952355891Z"
}
```
