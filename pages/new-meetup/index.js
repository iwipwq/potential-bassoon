// our-domain.com/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    try {
      // api와 클라이언트가 같은 서버에 있으므로 /
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);

      router.replace("/");
      // router.push('/')
    } catch (error) {
      console.dir(error);
    }
  }
  return (
    <Fragment>
      <Head>
        <title>Next 모임 - 새모임 등록하기</title>
        <meta
          name="description"
          content="새 모임을 등록하고 새로운 초능력자들을 만나보세요!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
