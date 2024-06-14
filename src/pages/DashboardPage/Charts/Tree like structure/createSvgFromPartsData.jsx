import React from 'react';
import ReactDOM from 'react-dom';
import { toSvg } from 'html-to-image';

const createSvgFromPartsData = async (partsData) => {
    // Create a hidden container for rendering the cards
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    // Render the parts data to the hidden container
    ReactDOM.render(
        <div className="card-container">
            {partsData.map(part => (
                <div key={part.part_id} className="card">
                    <h3>{part.part_description}</h3>
                    <p>Part Code: {part.part_code}</p>
                    <p>Model: {part.model}</p>
                    <p>Claimed Count: {part.claimed_count}</p>
                </div>
            ))}
        </div>,
        container
    );

    // Convert the container to an SVG string
    const svgString = await toSvg(container);

    // Clean up the hidden container
    document.body.removeChild(container);

    // Return the SVG string
    return svgString;
};

export default createSvgFromPartsData;
