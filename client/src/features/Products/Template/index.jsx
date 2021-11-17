import React from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import style from "./Template.module.scss";
import { Link } from "react-router-dom";
import prototype from "prop-types";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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
                <CardActionArea>
                  <CardMedia
                    className={style.img_container}
                    component="img"
                    image="https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2020/4/23/637232326768418337_lenovo-ideapad-L340-den-2.png"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.category.name}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <div className={style.btn_container}>
                      <Tooltip title="Thêm vào giỏ hàng">
                        <LoadingButton
                          loading={false}
                          className={style.card_btn}
                          variant="contained"
                          onClick={props.handleAddToCart}>
                          <AddShoppingCartIcon />
                        </LoadingButton>
                      </Tooltip>
                    </div>
                  </CardActions>
                  <Link
                    className={style.item_link}
                    to={`/store/product/${item._id}`}
                  />
                </CardActionArea>
              </Card>
            ))}
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
