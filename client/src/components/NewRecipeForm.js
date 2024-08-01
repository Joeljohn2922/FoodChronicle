import React, { useState } from 'react';


const NewRecipeForm = ({ onAddRecipe }) => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: '',
        ingredients: '',
        instructions: '',
        tag: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onAddRecipe function passed from the parent
        onAddRecipe(formData);
        // Clear the form after submission
        setFormData({
            title: '',
            image: '',
            description: '',
            ingredients: '',
            instructions: '',
            tag: '',
        });
    };

    return (
        <div className="new-recipe-form">
            <h1>Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Image:
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </label>

                

               

                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Ingredients:
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        placeholder="List all ingredients with quantities."
                    />
                </label>

                <label>
                    Instructions:
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Detail the steps needed to prepare the dish."
                    />
                </label>

                <label>
                    Tag:
                    <textarea
                        name="tag"
                        value={formData.notes}
                        onChange={handleChange}
                       
                    />
                </label>

                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default NewRecipeForm;