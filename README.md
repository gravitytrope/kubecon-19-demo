# Ambassador Demo

### Releasing

Create a tag to trigger travis to push a new release to quay.io/datawire/demo.

```
git tag {$TAG}
git push origin {$TAG}
```

Travis will then push two images: 
- `quay.io/datawire/demo:ui-$TAG`
- `quay.io/datawire/demo:quote-$TAG`

**Note:** Tags should be of form XX.YY.ZZ.
