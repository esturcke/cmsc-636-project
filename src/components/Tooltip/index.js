import React          from "react"
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger"
import Tooltip        from "react-bootstrap/lib/Tooltip"
import T              from "~/lib/types"

const Wrapper = ({ id, content, children, trigger = ["hover", "focus"], placement = "right" }) => (
  <OverlayTrigger rootClose overlay={<Tooltip id={id}>{content}</Tooltip>} placement={placement} trigger={trigger}>
    {children}
  </OverlayTrigger>
)

Wrapper.propTypes = {
  id        : T.string.isRequired,
  content   : T.node,
  children  : T.node,
  trigger   : T.arrayOf(T.oneOf(["hover", "focus", "click"])),
  placement : T.oneOf(["top", "bottom", "left", "right"]),
}

export default Wrapper
