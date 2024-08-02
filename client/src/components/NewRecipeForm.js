 
import { Formik } from "formik";
import * as yup from "yup";


const RecipeForm = ({ setNewRecipe }) => {

  // handles form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          ingredients: values.ingredients,
          instructions: values.instructions,
          tag: values.tag,
          
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const responseData = await response.json();
      setNewRecipe(responseData); // Update User component with new recipe data
      alert("Recipe Created!");
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Something went wrong. Please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  // Yup schema for form validation
  let validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    ingredients: yup.string().required("Ingredients are required"),
    instructions: yup.string().required("Instructions are required"), 
    tag: yup.string().required("Tag is required"),
  });

  return (
    <div className="recipe-form-container">
      <Formik
        initialValues={{
          name: '',
          description: '',
          ingredients: '',
          instructions: '', 
          tags: '',
          
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="recipe-form">
            <div className="form-group">
              <h1 className="recipe-form-header">Recipe Form</h1>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`}
              />
              {touched.title && errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`}
              />
              {touched.description && errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ingredients}
                className={`form-control ${touched.ingredients && errors.ingredients ? 'is-invalid' : ''}`}
              />
              {touched.ingredients && errors.ingredients && <div className="invalid-feedback">{errors.ingredients}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.instructions}
                className={`form-control ${touched.instructions && errors.instructions ? 'is-invalid' : ''}`}
              />
              {touched.instructions && errors.instructions && <div className="invalid-feedback">{errors.instructions}</div>}
            </div> 

            <div className="form-group">
              <label htmlFor="tags">Tag</label>
              <textarea
                id="tags"
                name="tags"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tags}
                className={`form-control ${touched.tags && errors.tags ? 'is-invalid' : ''}`}
              />
              {touched.tags && errors.tags && <div className="invalid-feedback">{errors.tags}</div>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default RecipeForm;