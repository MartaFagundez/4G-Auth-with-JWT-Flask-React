import React from 'react';
import { Link } from "react-router-dom";

export default function NavButton({route = "/", text = "Home"}) {
  return (
    <Link to={route}>
		<button className="btn btn-primary mx-1">{text}</button>
	</Link>
  )
}
