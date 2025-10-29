import React from "react";

export default function Home(){
    return (
        <div className="container">
            <div className="home-grid" role="region" aria-label="Home">
                <article className="card">
                    <h3> Curated Articles </h3>
                    <p> Start with accessible explainers and the latest research highlights. </p>
                </article>
                <article className="card">
                    <h3> Datasets Hub </h3>
                    <p>Send datasets here from Search/Maps to compare and visualize. </p>
                </article>
                <article className="card">
                    <h3> Your Notes </h3>
                    <p> Sign in to save annotations and track insights across modules. </p>
                </article>
                <article className="card">
                    <h3>Community Updates</h3>
                    <p>See alerts on crop disease, water quality changes, and field reports. </p>
                </article>
            </div>
        </div>
    )
}