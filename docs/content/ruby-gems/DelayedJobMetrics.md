# DelayedJobMetrics

Expose Prometheus Metrics for Delayed Jobs.

## Installation

!!! tip "Gemfile content"

    Add this line to your application's Gemfile:

    ```ruby
    gem 'delayed_job_metrics'
    ```

And then execute:

```sh
$~> bundle install
```

Or install it yourself as:

```sh
$~> gem install delayed_job_metrics
```

## Usage & Configurations

- Enable metrics middelware

```ruby
DELAYED_JOB_METRICS_ENABLED=true
```

- Start Rails server and start scraping metrics

```sh
$~> curl -fs http://127.0.0.1:3000/metrics
```

- Overwrite the default metrics endpoint

```ruby
DELAYED_JOB_METRICS_ENNDPOINT=/my_endpoint
```

- Setup basic auth

!!! tip "Basic Auth Configurations"

    Use the below environment variables to setup the basic authentication for the metrics endpiint
    
    ```ruby
    HTAUTH_METRICS_USER=user
    HTAUTH_METRICS_PASSWORD=secret
    ```
