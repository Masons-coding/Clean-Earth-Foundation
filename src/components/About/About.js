import './About.scss';

import cliffView from "../../assets/images/AboutUs1.jpg";
import lake from "../../assets/images/AboutUs2.jpg";
import waterfall from "../../assets/images/AboutUs3.jpg";

const About = () => {
    return (
    <section className="about-us">
        <div className="about-us__container">
            <h1 className="about-us__title">WHO WE ARE</h1>
        </div>
        <div className="about-us__all-content">
        <h2 className="about-us__text-title">Our Story:</h2><br></br>
        <p className="about-us__text">Clean Earth officially started in January 2017 when we registered it as a not for profit in Canada. Our team started unofficially years earlier when we noticed garbage on the local trails and in the water at the beach. We kept hearing more and more news about pollution around the world and we knew that we had to do something to help fight the pollution, doing our part to make the world better. We decided to create Clean Earth, an organization that would allow people to rally together to run cleanups, fund environmental initiatives, and help increase environmental education.<br></br><br></br>

As ambitious and daunting as the goals for Clean Earth are, we have to start somewhere and focus on a few issues first. We decided to focus on our Clean Trails and Clean Ocean initiatives, since we are passionate about hiking and swimming. We can to be part of the global effort focusing on preserving the health and future of our oceans and forests.<br></br><br></br>

With our home base in Toronto, the Clean Earth Movement is run on a volunteer bases. We are working hard on growing our team, gathering volunteers, and raising funds to start implementing our different Clean Earth initiatives around the world. Our major plan of action is to promote Clean Oceans, by running ocean cleanups, preventing plastic pollution and trash from reaching the ocean, and creating a recycling program to use the plastic waste in the creation of cement, fuel, or other available uses.<br></br><br></br>

We are excited for the future and cannot wait to work with all of our volunteers and share our efforts around the world!</p><br></br><br></br>
        <h2 className="about-us__text-title">Our Clean Earth Team:</h2><br></br>
        <p className="about-us__text">Our team is full of entrepreneurs, teachers, marketers, environmentalist, hikers, accountants, and generally just people who want to make a difference by taking actionable steps to help the environment. We are all friends who came together because of our love of the outdoors and our passion for the survival of our environment.<br></br><br></br>

We have had a wide variety of jobs amongst us, and have even started multiple businesses before because we love creating things and watching them grow. Our team is focused on growing our initiatives and creating a strong foundation for the future.<br></br><br></br>

We rely on the wide variety of backgrounds and skills that our team has to implement our plans and reach our goals for the environment.<br></br><br></br>

Clean Earth will continually update the list of initiatives with new areas of interest or new areas of concern around the globe. By focusing on transparency and visible change, we will streamline donations directly to the people on the ground; this will both improve the ease of donation, as well as more effectively display the results of such donations.<br></br><br></br>

We are currently creating our platform to allow people to organize, share and run their own clean up events in their local areas. We are focused on inspiring park, trail, field, river, lake and ocean clean ups in local communities around the world.<br></br><br></br>

We will help amplify the voices of thousands of not-for-profits and allow everyone to make a real difference, whether they are an activist or a donator.</p><br></br><br></br>

        <div className="about-us__picture-container">
                <img className="about-us__picture" src={cliffView} alt="Cliff view scenery"/>
                <img className="about-us__picture" src={lake} alt="Lake scenery"/>
                <img className="about-us__picture" src={waterfall} alt="Waterfall scenery" />
        </div>
        
        <h2 className="about-us__text-title">Our Initiatives:</h2><br></br>
        <p className="about-us__text">Along with our online platform, Clean Earth is currently running and starting our own initiatives and projects in many different environmental areas. These include: <br></br><br></br>

<b>Clean Trails-</b> Our Clean Trail initiative has performed garbage cleanups in three continents and five countries; from Canada and the United States, to the United Kingdom, and all the way to Tanzania and Puerto Rico. Our team of volunteers has gone across the globe in an attempt to better the environment personally. We have removed over 500 pounds of trash from walking trails and nature preserves already. We are working on growing this initiative around the world and we would love for people to volunteer to lead hikes and cleanups. <br></br><br></br>

<b>Clean Ocean-</b> Our Clean Ocean initiative is focused on removing plastic pollution from the ocean and keeping it from getting there in the first place. By 2050 there is estimated to be more plastic then fish in the ocean. This is a scary, and unbelievable thought. We are working on leading our own cleanups, partnering with other cleanup organizations, and finding volunteers to lead their own cleanups in their local area. Keeping plastic out of the ocean however will be achieved by going to the largest sources of the pollution and helping to create awareness about the environmental effect. Over 90% of the plastic pollution can be traced to just 10 rivers. We will then work with private organizations, local authorities, and other not for profits to create a recycling program so that the plastic waste will have a purpose for collection instead of ending up in landfills and in the water.</p><br></br><br></br>
        <h2 className="about-us__text-title">Future Initiatives: (Via partnerships, volunteers, and funding)</h2><br></br>
        <p className="about-us__text"><b>Clean Lakes-</b> Focus on lake protection, clean up, and sustainability projects throughout Canada, the United States, and the world.<br></br><br></br>

<b>Clean Energy-</b> Focus on development and funding of new energy projects or access to clean energy in developing counties. This includes promoting clean energy, showing people how they can incorporate clean energy into their homes, or providing low cost energy sources to people who don’t have reliable access to energy.<br></br><br></br>

<b>Clean Habitat-</b> Focus on conservation and protection of habitats and ecosystems for animals. Larger focuses would be the national parks in Canada and the United States, the Amazon rainforest, the Great Barrier Reef, and other large diverse ecosystems that are being destroyed. This also includes incorporating nature and the environment into urban centers through green spaces, rooftop garden initiatives, and other projects.<br></br><br></br>

<b>Clean Air-</b> Focus on the preservation and regulation of air quality around the world. This includes promoting new or existing clean air technologies and trying to implement them in new areas and countries. This also includes promotion of alternate transportation methods to reduce the number of cars of the road and reduce emissions coming from vehicles.<br></br><br></br>

<b>Climate Change-</b> Focus on climate change initiatives and technologies to reduce emissions around the world. Initial projects include better waste management strategies, sustainable consumption habits, and technologies and practices to reduce urban emission build ups.</p><br></br><br></br>                      
    </div>
    </section>
    );
};

export default About;
