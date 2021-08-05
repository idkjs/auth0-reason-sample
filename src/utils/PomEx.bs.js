

import * as $$Promise from "reason-promise/src/js/promise.bs.js";
import * as NodeFetch from "node-fetch";

$$Promise.get($$Promise.flatMap(NodeFetch("https://raw.githubusercontent.com/aantron/promise/master/README.md"), (function (response) {
            return response.text();
          })), (function (body) {
        console.log(body);
        
      }));

export {
  
}
/*  Not a pure module */
