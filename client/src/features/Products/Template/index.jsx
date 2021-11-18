import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import style from "./Template.module.scss";
import prototype from "prop-types";
import ItemProduct from "./ItemProduct";

const Template = (props) => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div>
          <h3>{props.componentName}</h3>
        </div>
        <div className={style.content_wrapper}>
          <div className={style.content}>
            {props.items.map((item) => {
              return (
                <ItemProduct
                  item={item}
                  userId={props.userId}
                  productId={item._id}
                />
              );
            })}
          </div>
          <aside className={style.category_wrapper}>
            <div className={style.category}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Hãng</Typography>
                </AccordionSummary>
                <AccordionDetails accordionId="1">
                  {props.brands.map((item) => (
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={item.name}
                      />
                    </FormGroup>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>GIá</Typography>
                </AccordionSummary>
                <AccordionDetails accordionId="1">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={"Dưới 10 triệu"}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={"10 - 20 triệu"}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={"trên 20 Triệu"}
                    />
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

Template.prototype = {
  items: prototype.array.isRequired,
  brands: prototype.array.isRequired,
  componentName: prototype.string,
  isLoading: prototype.bool,
};

Template.defaultProps = {
  items: [],
  brands: [],
  componentName: "",
  isLoading: false,
};

export default Template;
