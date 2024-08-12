import React from 'react';

// Assuming you have your images in the 'public/img' folder or adjust the path accordingly
import nmsaImage from '../../Images/National-Mission-For-Sustainable-Agriculture.jpg';
import pmksyImage from '../../Images/PMKSY.jpg';
import pmfbyImage from '../../Images/PMFBY-8-2-2021.jpg';
import './GovernmentScheme.css'
import Navbar from '../../components/home/Navbar';

const GovernmentSchemes = () => {
    return (
        <div>
            <Navbar/>
            {/* Hero Section */}
            {/* <div className="header">
                <h1>Government Schemes</h1>
            </div> */}
            {/* Blog Section */}
            <div>
                <div className='Container'>
                    {/* Blog Detail Start */}
                    <div className="leftcontainer">
                        <h1>National Mission for Sustainable Agriculture (NMSA)</h1>
                        <div className='Imagesection'>
                                <img className="img" src={nmsaImage} alt="National Mission for Sustainable Agriculture" />
                            </div>
                        <div className='contain'>
                            
                            <div className='detailsection'>
                                <div className='details'>
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
                                    <p><strong>The scheme wants to take a progressively sustainable route to adopt environment-friendly technologies,
                                        energy-efficient equipment, conservation of natural resources, and integrated farming.</strong></p>
                                    <p>There are other sub-schemes under <strong>NMSA</strong> like:</p>
                                    <ul>
                                        <li>Rainfed Area Development (RAD)</li>
                                        <li>Soil Health Management (SHM)</li>
                                        <li>Paramparagat Krishi Vikas Yojana (PKVY)</li>
                                        <li>Soil and Land Use Survey of India (SLUSI)</li>
                                        <li>National Rainfed Area Authority (NRAA)</li>
                                        <li>National Centre of Organic Farming (NCOF)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <h1>Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</h1>
                        <div className='Imagesection'>
                            <img className="img" src={pmksyImage} alt="Pradhan Mantri Krishi Sinchai Yojana" />
                        </div>
                        <div className='contain'>
                        
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
                        </div>

                        <h1 >Pradhan Mantri Fasal Bima Yojana (PMFBY) - Crop Insurance Scheme</h1>
                        <div className="Imagesection">
                                <img className="img" src={pmfbyImage} alt="Pradhan Mantri Fasal Bima Yojana" />
                            </div>
                        <div className='contain'>
                            
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
                    </div>
                    {/* Blog Detail End */}

                    {/* Sidebar Start */}
                    <div className="rightcontainer">
                        {/* Search Form Start */}
                        <div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Keyword" />
                                <button ><i className="search-icon"></i></button>
                            </div>
                        </div>
                        {/* Search Form End */}

                        {/* Category Start */}
                        <div className='statedetail'>
                            <h2>States</h2>
                            <div className='states'>
                                <a href="#">Madhya Pradesh</a>
                                <a href="#">Maharastra</a>
                                <a href="#">Rajasthan</a>
                                <a href="#">Bihar</a>
                                <a href="#">Gujrat</a>
                            </div>
                        </div>
                        {/* Category End */}

                        {/* Recent Post Start */}
                        <div className='postsrecent'>
                            <h2>Recent Post</h2>
                            <div className='posts'>
                                <div className="recentpost">
                                    <img src={nmsaImage} style={{ width: '75px' }} alt="National Mission for Sustainable Agriculture" />
                                    <a href="">National Mission for Sustainable Agriculture (NMSA)</a>
                                </div>
                                <div className="recentpost">
                                    <img src={pmksyImage} style={{ width: '75px' }} alt="Pradhan Mantri Krishi Sinchai Yojana" />
                                    <a href="">Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</a>
                                </div>
                                <div className="recentpost">
                                    <img className="img-fluid flex-shrink-0" src={pmfbyImage} style={{ width: '75px' }} alt="Pradhan Mantri Fasal Bima Yojana" />
                                    <a href="">Pradhan Mantri Fasal Bima Yojana (PMFBY) - Crop Insurance Scheme</a>
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
