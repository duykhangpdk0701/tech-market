import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  UncontrolledAccordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
  Button,
} from "reactstrap";
import style from "./Template.module.scss";
import { Link } from "react-router-dom";

const Template = (props) => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div>
          <h3>{props.componentName}</h3>
        </div>
        <div className={style.content_wrapper}>
          <div className={style.content}>
            {props.items.map((item) => (
              <Card key={item._id} className={style.item_wrapper}>
                <CardImg
                  className={style.img_container}
                  src="https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/23/637232326768418337_lenovo-ideapad-L340-den-2.png"
                />
                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.brand.name}
                  </CardSubtitle>
                  <CardText>{item.description}</CardText>
                  <Button>Add to cart</Button>
                </CardBody>
                <Link
                  className={style.item_link}
                  to={`/store/product/${item._id}`}
                />
              </Card>
            ))}
          </div>
          <aside className={style.category_wrapper}>
            <div className={style.category}>
              <UncontrolledAccordion defaultOpen={["1"]} stayOpen>
                <AccordionItem>
                  <AccordionHeader targetId="1">Thương hiệu</AccordionHeader>
                  <AccordionBody accordionId="1">
                    {props.brands.map((item) => (
                      <p>{item.name}</p>
                    ))}
                  </AccordionBody>
                </AccordionItem>
              </UncontrolledAccordion>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

Template.prototype = {
  items: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  componentName: PropTypes.string,
};

Template.defaultProps = {
  items: [],
  brands: [],
  componentName: "",
};

export default Template;
