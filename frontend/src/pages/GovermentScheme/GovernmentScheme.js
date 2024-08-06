import React from 'react';

// Assuming you have your images in the 'public/img' folder or adjust the path accordingly
import nmsaImage from '../../Images/National-Mission-For-Sustainable-Agriculture.jpg';
import pmksyImage from '../../Images/PMKSY.jpg';
import pmfbyImage from '../../Images/PMFBY-8-2-2021.jpg';

const GovernmentSchemes = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="display-1 text-white mb-md-4">Government Schemes</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-8">
                        {/* Blog Detail Start */}
                        <div className="mb-5">
                            <h1 className="mb-4">National Mission for Sustainable Agriculture (NMSA)</h1>
                            <div className="col-md-6">
                                <img className="img-fluid w-100" src={nmsaImage} alt="National Mission for Sustainable Agriculture" />
                            </div>
                            <p>
                                <a href="https://nmsa.dac.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#333399' }}>
                                    National Mission for Sustainable Agriculture (NMSA)
                                </a> is a government initiative to enhance agricultural productivity, especially in monsoon areas that focus on integrated farming, water-use efficiency, soil health management, and synergizing resource conservation.
                            </p>
                            <p>
                                NMSA is a parent agricultural scheme under which the government implements:
                            </p>
                            <ul>
                                <li>Water use efficiency</li>
                                <li>Nutrient Management</li>
                                <li>Livelihood diversification</li>
                            </ul>
                            <p><strong>The scheme wants to take a progressively sustainable route to adopt environment-friendly technologies, energy-efficient equipment, conservation of natural resources, and integrated farming.</strong></p>
                            <p>There are other sub-schemes under <strong>NMSA</strong> like:</p>
                            <ul>
                                <li>Rainfed Area Development (RAD)</li>
                                <li>Soil Health Management (SHM)</li>
                                <li>Paramparagat Krishi Vikas Yojana (PKVY)</li>
                                <li>Soil and Land Use Survey of India (SLUSI)</li>
                                <li>National Rainfed Area Authority (NRAA)</li>
                                <li>National Centre of Organic Farming (NCOF)</li>
                            </ul>

                            <h1 className="mb-4">Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</h1>
                            <div className="col-md-6">
                                <img className="img-fluid w-100" src={pmksyImage} alt="Pradhan Mantri Krishi Sinchai Yojana" />
                            </div>
                            <p><strong>“Har Khet ko Pani – More crop per drop”</strong></p>
                            <p>
                                The <a href="https://pmksy.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#333399' }}>
                                    Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)
                                </a> motto is <strong>‘Har Khet ko Pani’</strong> which seeks to improve irrigation facilities for farmers. And, it also introduces a focused manner with end to end solutions on source creation, distribution, management, field application, and extension activities.
                            </p>
                            <p>Objectives:</p>
                            <ul>
                                <li>Increased investment in irrigation at the field level</li>
                                <li>Expand cultivable area under irrigation</li>
                                <li>Improve farm water use efficiency to reduce wastage of water</li>
                                <li>Enhance the adoption of being precise in irrigation and other water-saving technologies (more crop per drop)</li>
                            </ul>

                            <h1 className="mb-4">Pradhan Mantri Fasal Bima Yojana (PMFBY) - Crop Insurance Scheme</h1>
                            <div className="col-md-6">
                                <img className="img-fluid w-100" src={pmfbyImage} alt="Pradhan Mantri Fasal Bima Yojana" />
                            </div>
                            <p>
                                <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#333399' }}>
                                    Pradhan Mantri Fasal Bima Yojana (PMFBY)
                                </a> is a Government-sponsored crop insurance scheme that integrates multiple stakeholders on a single platform.
                            </p>
                            <p>Objectives:</p>
                            <ol>
                                <li>Provide insurance coverage and financial support to farmers in case crops get damaged due to natural calamities, pests & diseases.</li>
                                <li>Stabilize the income of farmers to ensure a steady career and business growth.</li>
                                <li>Encourage farmers to adopt innovative and modern agricultural practices.</li>
                                <li>Ensure positive cash and credit flow in the agriculture sector.</li>
                            </ol>
                        </div>
                        {/* Blog Detail End */}
                    </div>

                    {/* Sidebar Start */}
                    <div className="col-lg-4">
                        {/* Search Form Start */}
                        <div className="mb-5">
                            <div className="input-group">
                                <input type="text" className="form-control p-3" placeholder="Keyword" />
                                <button className="btn btn-primary px-4"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                        {/* Search Form End */}

                        {/* Category Start */}
                        <div className="mb-5">
                            <h2 className="mb-4">States</h2>
                            <div className="d-flex flex-column justify-content-start bg-primary p-4">
                                <a className="fs-5 fw-bold text-white mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Madhya Pradesh</a>
                                <a className="fs-5 fw-bold text-white mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Maharastra</a>
                                <a className="fs-5 fw-bold text-white mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Rajasthan</a>
                                <a className="fs-5 fw-bold text-white mb-2" href="#"><i className="bi bi-arrow-right me-2"></i>Bihar</a>
                                <a className="fs-5 fw-bold text-white" href="#"><i className="bi bi-arrow-right me-2"></i>Gujrat</a>
                            </div>
                        </div>
                        {/* Category End */}

                        {/* Recent Post Start */}
                        <div className="mb-5">
                            <h2 className="mb-4">Recent Post</h2>
                            <div className="bg-primary p-4">
                                <div className="d-flex overflow-hidden mb-3">
                                    <img className="img-fluid flex-shrink-0" src={nmsaImage} style={{ width: '75px' }} alt="National Mission for Sustainable Agriculture" />
                                    <a href="" className="d-flex align-items-center bg-white text-dark fs-5 fw-bold px-3 mb-0">National Mission for Sustainable Agriculture (NMSA)</a>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img className="img-fluid flex-shrink-0" src={pmksyImage} style={{ width: '75px' }} alt="Pradhan Mantri Krishi Sinchai Yojana" />
                                    <a href="" className="d-flex align-items-center bg-white text-dark fs-5 fw-bold px-3 mb-0">Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</a>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img className="img-fluid flex-shrink-0" src={pmfbyImage} style={{ width: '75px' }} alt="Pradhan Mantri Fasal Bima Yojana" />
                                    <a href="" className="d-flex align-items-center bg-white text-dark fs-5 fw-bold px-3 mb-0">Pradhan Mantri Fasal Bima Yojana (PMFBY) - Crop Insurance Scheme</a>
                                </div>
                            </div>
                        </div>
                        {/* Recent Post End */}
                    </div>
                    {/* Sidebar End */}
                </div>
            </div>
        </div>
    );
};

export default GovernmentSchemes;
