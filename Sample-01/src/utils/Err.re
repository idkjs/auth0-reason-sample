type t =
  | UnknownError
  | NetworkError(string);

let toString = err => {
  switch (err) {
  | UnknownError => "Unknown error"
  | NetworkError(e) => {j|$e error|j}
  };
};

