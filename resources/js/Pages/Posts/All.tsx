import { Link } from "@inertiajs/react";

export default function All({ posts }) {
    console.log(posts);

    return (
        <div>
            <Link href={route("createpost")}>Create Post</Link>
            {posts.map((e) => {
                return (
                    <div>
                        {e.title}
                        <div>{e.body}</div>
                        <div>
                            <Link href={route("edit", { id: e.id })}>
                                details
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
