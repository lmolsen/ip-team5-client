import "./widget.scss";
import responses from "../../data/responses.json";
import { useState } from "react";

function Widget({ pageName, persona }) {
  const [initial, setInitial] = useState(true);
  const [expand, setExpand] = useState(false);
  const [transparency, setTransparency] = useState(true);
  const [closeWidget, setCloseWidget] = useState(false);

  function handleWidgetClose(event) {
    setCloseWidget(!closeWidget);
    setExpand(false);
  }

  function handleExpand(event) {
    setExpand(!expand);
  }

  function handleOpacity(event) {
    if (initial) {
      setTransparency(!transparency);
      setInitial(false);
    }
  }

  function getSectionClassName() {
    let classname = "content";
    if (expand) {
      classname += " content__fullview";
    }
    if (closeWidget) {
      classname += " content--hide";
    }
    if (transparency) {
      classname += " content--opaque";
    }
    return classname;
  }

  return (
    <div className={expand ? "widget widget__fullview" : "widget"}>
      <section className={getSectionClassName()} onClick={handleOpacity}>
        <div className="content__expand" onClick={handleExpand}>
          <svg fill="#000000" height="24" width="24" viewBox="0 0 54 54">
            <g>
              <path d="M0,0v54h54V0H0z M52,52H2V2h50V52z" />
              <path
                d="M7,8.414l15.293,15.293C22.488,23.902,22.744,24,23,24s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L8.414,7
		h11.729V5H5v15.143h2V8.414z"
              />
              <path
                d="M45.586,47H33.857v2H49V33.857h-2v11.729L31.707,30.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L45.586,47z
		"
              />
            </g>
          </svg>
          <div>
            {responses.map((item, index) => {
              return item.page === pageName &&
                item.persona_id === parseInt(persona) ? (
                <div key={index} className="summary">
                  <p>
                    <strong>Summary:</strong> {item.personalized_summary}
                  </p>
                  <p>
                    <strong>Next Steps:</strong> {item.next_steps}
                  </p>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      </section>
      <div className="sidebar" onClick={handleWidgetClose}></div>
    </div>
  );
}

export default Widget;
