import axios from "axios";

const baseUrl = "https://api.skilla.ru/mango"

const Client = (type: "list" | "callRecord") => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": type === "list" ? "application/json" : "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
      "Content-Transfer-Encoding": type !== "list" ? "binary" : undefined,
      "Content-Disposition": type !== "list" ? "filename=record.mp3" : undefined,
      Authorization: `Bearer testtoken`,
    },
  });
}

Client("list").interceptors.response.use(
  (response) => {
    console.log(`status: ${response.status}`, `url: ${response.config.url}`)
    return response
  },
  (err) => {
    const {
      response: {
        data: {error},
      },
    } = err;
    console.log(err)
    console.error(`${err} ${err.stack}`)
    return Promise.reject(err);
  }
);

export { Client };