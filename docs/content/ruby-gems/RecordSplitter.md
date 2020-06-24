# FluentD Record Splitter

A Fluentd plugin to split fluentd events into multiple records

## Installation

!!! tip "Gemfile content"

    Add this line to your application's Gemfile:

    ```ruby
    gem 'fluent-plugin-record-splitter'
    ```

And then execute:

```sh
$~> bundle install
```

Or install it yourself as:

```sh
$~> gem install fluent-plugin-record-splitter
```

## Configurations

| Configuration Ite | Description |
|-|-|
| tag | The output tag for the generated records |
| input_key | The target key to be splited |
| output_key | The generateed splitted key (if not specified input_key will be used) |
| split_stratgey | The strategy used to splited the message should be either lines or regex |
| split_regex | Regex to split lines |
| shared_keys | List of keys to be shared between all generated records |
| remove_keys | List of keys to be removed from all generated records |
| append_new_line | Append a new line to the end of the input event |
| remove_new_line | Remove the new line form the end of the generated events |
| remove_input_key | Remove the key spcified by `input_key` from the generated events |

## Configuration Examples

Split lines based on the new line charachter `\n`.

```yaml tab="Configuration"
<match pattern>
  @type record_splitter
  tag splitted.log
  input_key message
  split_stratgey lines
  append_new_line true
  remove_new_line true
  shared_keys ["akey"]
</match>
```

```yaml tab="Input"
{
  'akey':'c',
  'abkey':'cc',
  'message': 'line one\nlines2'
}
```

```yaml tab="Output"
{'akey':'c', 'message': 'line one' }
{'akey':'c', 'message': 'lines2' }
```

Split lines based on a defined regex.

```yaml tab="Configuration"
<match pattern>
  @type record_splitter
  tag splitted.log
  input_key message
  split_stratgey regex
  split_regex /\d+\s<\d+>.+/
  remove_keys ["akey"]
</match>
```

```yaml tab="Input"
{
  'dkey':'c',
  'akey':'c',
  'abkey':'cc',
  'message': '83 <40>1 2012-11-30T06:45:29+00:00 start app\n90 <40>1 2012-11-30T06:45:26+00:00 host app web.3 - Starting process'
}
```

```yaml tab="Output"
{
  'dkey':'c',
  'abkey':'cc',
  'message': '83 <40>1 2012-11-30T06:45:29+00:00 start app'
}
{
  'dkey':'c',
  'abkey':'cc',
  'message': '90 <40>1 2012-11-30T06:45:26+00:00 host app web.3 - Starting process'
}
```
