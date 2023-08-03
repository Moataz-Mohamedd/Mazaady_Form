import Head from "next/head";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import Table from "@/components/Table";
import axiosApi from "@/api/items";
import { get_models, get_process_types, get_types } from "@/services/services";

export default function Home({ all_cats_with_sub_cats }) {
  console.log(`all_cats_with_sub_cats`, all_cats_with_sub_cats.data.categories);
  let all_cats_with_subs = all_cats_with_sub_cats.data.categories;

  // Show
  const [showOther, setShowOther] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showType, setShowType] = useState(false);
  // Data
  const [allCatgories, setAllCatgories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [processTypes, setProcessTypes] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [type, setType] = useState([]);
  const [transmissionType, setTransmissionType] = useState([]);
  // Table
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    setAllCatgories(
      all_cats_with_subs.map((item) => {
        return { value: item.id, label: item.slug };
      })
    );
  }, []);

  // Formik Validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      main_category: "",
      sub_category: "",
      process_type: "",
      process_type_user: "",
      brand: "",
      model: "",
      type: "",
      transmission_type: "",
    },
    validationSchema: Yup.object({
      main_category: Yup.string().required("Please Select The Main Category"),
      sub_category: Yup.string().required("Please Select The Sub Category"),
      process_type:
        showOther === false
          ? Yup.string().required("Please Select The Process Type ")
          : Yup.string().nullable(true),
      process_type_user: showOther
        ? Yup.string().required("Please Enter The Process Type ")
        : Yup.string().nullable(true),
      brand: Yup.string().required("Please Select The Brand"),
      model: Yup.string().required("Please Select The Model"),
      type: Yup.string().required("Please Select The Type"),
      transmission_type: Yup.string().required(
        "Please Select The Transmission Type"
      ),
    }),
    onSubmit: (values) => {
      setTableData(values);
      console.log(values);
    },
  });
  // const options1 = [
  //   { value: "", label: "Main Category" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];
  // const options2 = [
  //   { value: "", label: "Sub Category" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];
  // const options3 = [
  //   { value: "", label: "Process Type" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   { value: "other", label: "other" },
  //   // Add more options as needed
  // ];
  // const options5 = [
  //   { value: "", label: "Brand" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];
  // const options6 = [
  //   { value: "", label: "Model" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];
  // const options7 = [
  //   { value: "", label: "Type" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];
  // const options8 = [
  //   { value: "", label: "Transmission Type" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   // Add more options as needed
  // ];

  const handleChangeMainCat = (selectedOption) => {
    // Handle the selected option here
    setProcessTypes([{ value: "other", label: "other" }]);
    // console.log("Selected option1:", selectedOption);
    const all_sub_cats = all_cats_with_subs.filter(
      (item) => item.id === selectedOption.value
    )[0].children;
    // console.log("Test", all_cats_with_subs.filter((item)=>item.id===1)[0].children);
    setSubCategories(
      all_sub_cats.map((item) => {
        return { value: item.id, label: item.slug };
      })
    );
  };
  const handleChangeSubCat = async (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option2:", selectedOption);
    const process_type_response = await get_process_types(selectedOption.value);
    // console.log("Test", process_type_response.data);
    // console.log("Test2",process_type_response.data[0].options.map((item)=>{ return {value:item.id,label:item.slug}}))

    setProcessTypes(
      process_type_response.data[0]?.options.map((item) => {
        return { value: item.id, label: item.slug };
      }) || []
    );
    setBrand(
      process_type_response.data[1]?.options.map((item) => {
        return { value: item.id, label: item.slug };
      }) || []
    );
    setTransmissionType(
      process_type_response.data[2]?.options.map((item) => {
        return { value: item.id, label: item.slug };
      }) || []
    );
    setProcessTypes(
      process_type_response.data[0]?.options.map((item) => {
        return { value: item.id, label: item.slug };
      }) || []
    );
  };
  const handleChangeProcessType = (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option3:", selectedOption);
    selectedOption.value === `other` ? setShowOther(true) : setShowOther(false);
  };
  const handleChangeFromUser = (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option4:", selectedOption.target.value);
  };
  const handleChangeBrand = async (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option5:", selectedOption);
    const model_response = await get_models(selectedOption.value);
    setModel(
      model_response.data[0]?.options.map((item) => {
        return { value: item.id, label: item.slug };
      })
    );
    // console.log(`Test4`,model_response.data[0].options.map((item)=>{ return {value:item.id,label:item.slug}}))
    selectedOption.value !== `` ? setShowModel(true) : setShowModel(false);
    selectedOption.value !== `` ? null : setShowType(false);
  };
  const handleChangeModel = async (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option6:", selectedOption);
    const types_response = await get_types(selectedOption.value);
    setType(
      types_response.data[0]?.options.map((item) => {
        return { value: item.id, label: item.slug };
      })
    );
    selectedOption.value !== `` ? setShowType(true) : setShowType(false);
  };
  const handleChangeType = (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option7:", selectedOption);
  };
  const handleChangeTransmissionType = (selectedOption) => {
    // Handle the selected option here
    // console.log("Selected option8:", selectedOption);
  };
  return (
    <>
      <Head>
        <title>
          Mazaady - Mazaady is an onlineauction classfieds platform.
        </title>
        <meta
          property="og:title"
          content="Mazaady - Mazaady is an onlineauction classfieds platform."
          key="title"
        />
      </Head>
      <div className="h-[100vh] w-full flex flex-col justify-center items-center">
        <div className="w-[80%] h-max py-2 flex flex-col justify-around items-center gap-5 border-solid border border-[#cccccc] rounded-md ">
          <div className=" relative px-5 w-full flex flex-col justify-around items-start">
            <label className="block text-black mb-2">Main Category</label>
            <Select
              className="w-full"
              name="main_category"
              options={allCatgories}
              onChange={(e) => {
                validation.setFieldValue("main_category", e.label);
                handleChangeMainCat(e);
              }}
              onBlur={validation.handleBlur}
              isSearchable
              placeholder="Select an option"
            />
            {validation.touched.main_category &&
            validation.errors.main_category ? (
              <span
                className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                type="invalid"
              >
                {validation.errors.main_category}
              </span>
            ) : null}
          </div>
          <div className="relative px-5 w-full flex flex-col justify-around items-start">
            <label className="block text-black mb-2">Sub Category</label>
            <Select
              className="w-full"
              name="sub_category"
              options={subCategories}
              onChange={(e) => {
                validation.setFieldValue("sub_category", e.label);
                handleChangeSubCat(e);
              }}
              onBlur={validation.handleBlur}
              isSearchable
              placeholder="Select an option"
              isDisabled={validation.values.main_category === `` ? true : false}
            />
            {validation.touched.sub_category &&
            validation.errors.sub_category ? (
              <span
                className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                type="invalid"
              >
                {validation.errors.sub_category}
              </span>
            ) : null}
          </div>
          <div className="relative px-5 w-full flex flex-col justify-around items-start">
            <label className="block text-black mb-2">Process Type</label>
            <Select
              className="w-full"
              name="process_type"
              options={[...processTypes, { value: "other", label: "other" }]}
              isSearchable={false}
              onChange={(e) => {
                validation.setFieldValue("process_type", e.label);
                validation.setFieldValue("process_type_user", "");
                handleChangeProcessType(e);
              }}
              onBlur={validation.handleBlur}
              placeholder="Select an option"
            />
            {validation.touched.process_type &&
            validation.errors.process_type ? (
              <span
                className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                type="invalid"
              >
                {validation.errors.process_type}
              </span>
            ) : null}
          </div>
          {showOther ? (
            <div className="relative px-5 w-full flex flex-col justify-around items-start">
              <input
                type="text"
                className="w-full border-solid border border-[#cccccc] rounded-md p-1"
                name="process_type_user"
                isSearchable={false}
                onChange={(e) => {
                  validation.setFieldValue("process_type_user", e.target.value);
                  handleChangeFromUser(e);
                }}
                onBlur={validation.handleBlur}
                placeholder="From User"
              />
              {validation.touched.process_type_user &&
              validation.errors.process_type_user ? (
                <span
                  className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                  type="invalid"
                >
                  {validation.errors.process_type_user}
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="relative px-5 w-full flex flex-col justify-around items-start">
            <label className="block text-black mb-2">Brand</label>
            <Select
              className="w-full"
              name="brand"
              options={brand}
              isSearchable={false}
              onChange={(e) => {
                validation.setFieldValue("brand", e.label);
                validation.setFieldValue("model", "");
                validation.setFieldValue("type", "");
                handleChangeBrand(e);
              }}
              onBlur={validation.handleBlur}
              placeholder="Select an option"
            />
            {validation.touched.brand && validation.errors.brand ? (
              <span
                className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                type="invalid"
              >
                {validation.errors.brand}
              </span>
            ) : null}
          </div>
          {showModel ? (
            <div className="relative px-5 w-full flex flex-col justify-around items-start">
              <label className="block text-black mb-2">Model</label>
              <Select
                className="w-full"
                name="model"
                options={model}
                isSearchable={false}
                defaultInputValue={validation.values.model}
                onChange={(e) => {
                  validation.setFieldValue("model", e.label);
                  validation.setFieldValue("type", "");
                  handleChangeModel(e);
                }}
                onBlur={validation.handleBlur}
                placeholder="Select an option"
              />
              {validation.touched.model && validation.errors.model ? (
                <span
                  className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                  type="invalid"
                >
                  {validation.errors.model}
                </span>
              ) : null}
            </div>
          ) : null}
          {showType ? (
            <div className="relative px-5 w-full flex flex-col justify-around items-start">
              <label className="block text-black mb-2">Type</label>
              <Select
                className="w-full"
                name="type"
                options={type}
                isSearchable={false}
                onChange={(e) => {
                  validation.setFieldValue("type", e.label);
                  handleChangeType(e);
                }}
                onBlur={validation.handleBlur}
                placeholder="Select an option"
              />
              {validation.touched.type && validation.errors.type ? (
                <span
                  className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                  type="invalid"
                >
                  {validation.errors.type}
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="relative px-5 w-full flex flex-col justify-around items-start">
            <label className="block text-black mb-2">Transmission Type</label>
            <Select
              className="w-full"
              name="transmission_type"
              options={transmissionType}
              isSearchable={false}
              onChange={(e) => {
                validation.setFieldValue("transmission_type", e.label);
                handleChangeTransmissionType(e);
              }}
              onBlur={validation.handleBlur}
              placeholder="Select an option"
            />
            {validation.touched.transmission_type &&
            validation.errors.transmission_type ? (
              <span
                className="absolute bottom-[-25px] text-[14px] text-[#ff0000]"
                type="invalid"
              >
                {validation.errors.transmission_type}
              </span>
            ) : null}
          </div>
          <div className="relative px-5 w-full flex flex-row justify-center items-center">
            <button
              type="submit"
              onClick={() => {
                validation.handleSubmit();
              }}
              className="bg-[#214aa2] text-[gold] rounded-md p-2 text-lg font-bold hover:animate-pulse"
            >
              Submit
            </button>
          </div>
          <div className="px-5 w-full flex flex-row justify-center items-center">
            <Table data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(`Context`,context)
  try {
    let response;
    response = await axiosApi.get("get_all_cats");
    console.log(`Response`, response.data);
    return {
      props: {
        all_cats_with_sub_cats: response.data || [],
      },
    };
  } catch (error) {
    console.log("call error", error);
  }
  return {
    props: {
      all_cats_with_sub_cats: [],
    },
  };
}
