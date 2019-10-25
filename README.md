# Ambassador Demo

### Running

- Run `make apply-ambassador` in pro-ref-arch
- Sanitize the cluster by altering the following resources -
  - `kubectl delete modules.getambassador.io ambassador`
  - `kubectl delete deployments qotm`
  - `kubectl delete mappings.getambassador.io httpbin httpbin-limited qotm-limited qotm-open`
  - `kubectl delete authservices.getambassador.io ambassador-pro-auth`
  - `kubectl apply -f self-service/httpbin.yaml`
- Restart Ambassador once
  - `kubectl delete pod -l service=ambassador`
- Update the tour images with demo images
  - `kubectl set image deployments tour ui=<UI image here>`
  - `kubectl set image deployments tour backend=<backend image here>`
- Configure permissions so `kubectl` can be run from inside the pod
  - `kubectl create clusterrolebinding add-on-cluster-admin   --clusterrole=cluster-admin   --serviceaccount=default:default`
- Make sure demo pod is port-forwarded to localhost:8080 - this is required for applying manifests
  - `kubectl port-forward tour-ddd7495bd-2f2gv 8080`
- Start the demo by visiting ambassador's URL - `kubectl get serivce ambassador`
- In the authentication demo:
  - The pod takes some time to come up - wait for it.
  - Once you apply the AuthService, make sure to reload in a new incognito window because browser cache might now reflect authentication immediately.
- In the self-service demo:
  - Run the pinger in one tab - `./test-self-service.sh https://<Ambassador IP>/httpbin/ip https://<Ambassador IP>/qotm-1/`
  - Demonstrate and apply qotm.yaml - `kubectl apply -f qotm.yaml`
  - Add a new mapping to qotm.yaml which exposes a new path `/quote/2` and apply qotm.yaml again -
```
apiVersion: getambassador.io/v1
kind: Mapping
metadata:
  name: qotm-2
spec:
  prefix: /qotm-2/
  service: qotm
  rewrite: /quote/2
```

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
