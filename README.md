# Ambassador Tour

### Releasing

Create a tag to trigger travis to push a new release to quay.io/datawire/tour.

```
git tag {$TAG}
git push origin {$TAG}
```

Travis will then push two images: 
- `quay.io/datawire/tour:ui-$TAG`
- `quay.io/datawire/tour:quote-$TAG`

**Note:** Tags should be of form XX.YY.ZZ.
