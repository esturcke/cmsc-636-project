import React      from "react"
import { render } from "react-dom"
import App        from "~/components/App"

import "bootstrap/dist/css/bootstrap.min.css"
import "minireset.css/minireset.sass"
import "@typopro/web-fira-sans/TypoPRO-FiraSans.css"
import "~/styles/global.css"

render(<App/>, document.getElementById("root"))
