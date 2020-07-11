# FluentD key-Value Parser

A FluentD filter plugin to parse FluentD events that folollow key-value format messages and extract attributes defined in the messages.

## Installation

!!! tip "Gemfile content"

    Add this line to your application's Gemfile:

    ```ruby
    gem 'fluent-plugin-filter-kv-parser'
    ```

And then execute:

```sh
$~> bundle install
```

Or install it yourself as:

```sh
$~> gem install fluent-plugin-filter-kv-parser
```

## Configurations

| Configuration Ite | Description |
|-|-|
| key | The key that contains the message to be parsed. The default value is `log` |
| remove_key | A boolean value to remove the message key after parsing. Default is false  |
| filter_out_lines_without_keys | A boolean value that indicates whether to remove or keep events with no key-value items. Default is false |
| use_regex | A boolean value to indicate whether to use regex for parsing the messages or not. The default is false. |
| remove_prefix | A regex to remove a prefix of the message and to exclude it from being parsed |
| keys_delimiter | The Key delimiter character (how the keys are separated). The default is space.  |
| kv_delimiter_char | The Key-Value delimiter. The default is `=`  |
| filtered_keys | List of keys that will be whitelisted |
| filtered_keys_regex | A regex to white list extracted keys  |
| filtered_keys_delimiter |  The character used to separate keys defined in `filtered_keys` |

## Configuration Examples

Filter log message and whitelist a specific keys.

```yaml tab="Configuration"
<match pattern>
  @type key_value_parser
  key log
  remove_key true
  remove_prefix /^[^ ]+\s[^ ]+/
  use_regex true
  filtered_keys key,gkeyn,nkey,skey,akey,zkey
</match>
```

```yaml tab="Input"
{
  'time' => '2013-02-12 22:01:15 UTC',
  'log'  => "Start Request key=10 gkey=100 nkey=108 skey='this is a miltispace line' akey=20 zkey=30 dkey=4"
}
```

```yaml tab="Output"
{
  "time"=>"2013-02-12 22:01:15 UTC",
  "key"=>"10",
  "nkey"=>"108",
  "skey"=>"'this is a miltispace line'",
  "akey"=>"20",
  "zkey"=>"30"
}
```

Filter log message and whitelist keys that match a given regex.

```yaml tab="Configuration"
<match pattern>
  @type key_value_parser
  key log
  remove_key true
  remove_prefix /^[^ ]+\s[^ ]+/
  use_regex true
  filtered_keys none
  filtered_keys_regex /^sub_[a-zA-Z_0-9]+/
</match>
```

```yaml tab="Input"
{
  'time' => '2013-02-12 22:01:15 UTC',
  'log'  => "Start Request sub_key=0 sub_akey=11 sub_zkey=12 key=10 gkey=100 nkey=108 skey='this is a miltispace line' akey=20 zkey=30 dkey=4"
}
```

```yaml tab="Output"
{
  "time"=>"2013-02-12 22:01:15 UTC",
  "sub_key"=>"0",
  "sub_akey"=>"11",
  "sub_zkey"=>"12"
}
```

Filter log message and whitelist keys that match a given regex or are whitelisted .

```yaml tab="Configuration"
<match pattern>
  @type key_value_parser
  key log
  remove_key true
  remove_prefix /^[^ ]+\s[^ ]+/
  use_regex true
  filtered_keys key,gkey
  filtered_keys_regex /^sub_[a-zA-Z_0-9]+/
</match>
```

```yaml tab="Input"
{
  'time' => '2013-02-12 22:01:15 UTC',
  'log'  => "Start Request sub_key=0 sub_akey=11 sub_zkey=12 key=10 gkey=100 nkey=108 skey='this is a miltispace line' akey=20 zkey=30 dkey=4"
}
```

```yaml tab="Output"
{
  "time"=>"2013-02-12 22:01:15 UTC",
  "gkey"=>"100",
  "key"=>"10",
  "sub_key"=>"0",
  "sub_akey"=>"11",
  "sub_zkey"=>"12"
}
```
