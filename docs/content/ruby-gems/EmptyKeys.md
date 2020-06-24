# Fluent Empty keys

A Fluentd filter plugin to filter out and removes empty keys from FluentD messages.

## Installation

!!! tip "Gemfile content"

    Add this line to your application's Gemfile:

    ```ruby
    gem 'fluent-plugin-filter_empty_keys'
    ```

And then execute:

```sh
$~> bundle install
```

Or install it yourself as:

```sh
$~> gem install fluent-plugin-filter_empty_keys
```

## Configurations

| Configuration Ite | Description |
|-|-|
| empty_keys | A Key-Value list to define empty values for specific keys. By default keys with empty values will be removed, However keys with values such s `0` or `undefined` will not be removed. This Configuration Item can be used to remove the later keys. |
| keys_delimiter | The character used to seperate the keys defined in `empty_keys`. The default value is `,` |
| values_delimiter | The character used to assign values to keys in `empty_keys`. The default value is `:` |

## Configuration Examples

Filter out all keys with empty values.

```yaml tab="Configuration"
<filter **>
  type empty_keys
</filter>
```

```yaml tab="Input"
{
  "field1":"",
  "field2":"2",
  "field3":"2013-02-12 22:04:14 UTC",
  "field4":"",
  "field5":"a,b,c"
}
```

```yaml tab="Output"
{
  "field2":"2",
  "field3":"2013-02-12 22:04:14 UTC",
  "field5":"a,b,c"
}
```

Filter out all keys with empty, `0`, Undefined values .

```yaml tab="Configuration"
<filter **>
  type empty_keys
  empty_keys field0:0,field2:Undefined
</filter>
```

```yaml tab="Input"
{
  "field0":0,
  "field1":"",
  "field2":"Undefined",
  "field3":"2013-02-12 22:04:14 UTC",
  "field4":"",
  "field5":"a,b,c"
}
```

```yaml tab="Output"
{
  "field3":"2013-02-12 22:04:14 UTC",
  "field5":"a,b,c"
}
```
