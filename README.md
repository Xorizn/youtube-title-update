# API YOUTUBE
<img scr="https://www.labnol.org/static/19650a181bb2b847809cd42266bdcc17/607b4/youtube-video-views-title.png" />


By default, the JSON-encoded return value of the function is set as the "result" in the
output of a github-script step. For some workflows, string encoding is preferred. This option can be set using the
`result-encoding` input:

```yaml
- uses: actions/github-script@v5
  id: my-script
  with:
    result-encoding: string
    script: return "I will be string (not JSON) encoded!"
```
