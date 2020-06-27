# IRBTracker

IRBTracker is a tool that helps in tracking and correlating all commands exected in the IRB console. the gem supports the following features.

- Authenticate IRB console users using LDAP.
- Collect IRB command logs into a local file.
- Forward Logs to a centralized server using fluent-logger.

## Installation

!!! tip "Gemfile content"

    Add this line to your application's Gemfile:

    ```ruby
    gem 'irb_tracker'
    ```

And then execute:

```sh
$~> bundle install
```

Or install it yourself as:

```sh
$~> gem install irb_tracker
```

## Rails Console Usage

In your `bin/rails` file you should add following

~~~ruby
#!/usr/bin/env ruby
APP_PATH = File.expand_path('../config/application', __dir__)
require_relative '../config/boot'
require 'irb_tracker'
require 'irb'
require 'io/console'

RAILS_USER = STDIN.getpass("Email:")
if (IRBTracker::LDAPLogin.authenticate(RAILS_USER, STDIN.getpass("Password:")))
  IRB::Context.prepend(IRBTracker::IRBLoggable.new("MyRailsApp"))
  require 'rails/commands'
else
  puts "Invalid email and user"
end
~~~

## Configurations

Below is a list of environment variables used by the gem

```yaml tab="LDAP Environment Variables"
LDAP_HOST
LDAP_PORT
LDAP_BASE
LDAP_ADMIN_USER
LDAP_ADMIN_PASSWORD
```

```yaml tab="FluentD Environment Variables"
FLUENTD_LOGGING_ENABLED
FLUENTD_LOG_HOST
FLUENTD_LOG_HOST_PORT
```
