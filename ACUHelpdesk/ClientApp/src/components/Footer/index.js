import React from "react";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinkItems,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./FooterElements";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const aboutusBaseURL = "https://www.unescwa.org/";

  return (
    <>
      <FooterContainer>
        <FooterWrap>
          <FooterLinksContainer>
            <FooterLinksWrapper>
              <FooterLinkItems>
                <FooterLinkTitle>{t("footer.aboutus.aboutus")}</FooterLinkTitle>
                <FooterLink
                  to={{
                    pathname: `${aboutusBaseURL}${t(
                      "footer.aboutus.overviewLink"
                    )}`,
                  }}
                  target="_blank"
                >
                  {t("footer.aboutus.overview")}
                </FooterLink>
                <FooterLink
                  to={{
                    pathname: `${aboutusBaseURL}${t(
                      "footer.aboutus.executiveSecretaryLink"
                    )}`,
                  }}
                  target="_blank"
                >
                  {t("footer.aboutus.executiveSecretary")}
                </FooterLink>
                <FooterLink
                  to={{
                    pathname: `${aboutusBaseURL}${t(
                      "footer.aboutus.memberStatesLink"
                    )}`,
                  }}
                  target="_blank"
                >
                  {t("footer.aboutus.memberStates")}
                </FooterLink>
                <FooterLink
                  to={{
                    pathname: `${aboutusBaseURL}${t(
                      "footer.aboutus.regionalCoordinationLink"
                    )}`,
                  }}
                  target="_blank"
                >
                  {t("footer.aboutus.regionalCoordination")}
                </FooterLink>
                <FooterLink
                  to={{
                    pathname: `${aboutusBaseURL}${t(
                      "footer.aboutus.statisticsInfoLink"
                    )}`,
                  }}
                  target="_blank"
                >
                  {t("footer.aboutus.statisticsInfo")}
                </FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLinkTitle>{t("footer.links.links")}</FooterLinkTitle>
                <FooterLink to="/">{t("footer.links.escwadata")}</FooterLink>
                <FooterLink to="/">{t("footer.links.elearning")}</FooterLink>
                <FooterLink to="/">{t("footer.links.unDigitalLib")}</FooterLink>
                <FooterLink to="/">{t("footer.links.unIntlDays")}</FooterLink>
                <FooterLink to="/">
                  {t("footer.links.greeningTheBlue")}
                </FooterLink>
                <FooterLink to="/">{t("footer.links.unSystem")}</FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FooterLinkTitle>
                  {t("footer.services.services")}
                </FooterLinkTitle>
                <FooterLink to="/">
                  {t("footer.services.technicalCooperationNetwork")}
                </FooterLink>
                <FooterLink to="/">
                  {t("footer.services.conferenceServices")}
                </FooterLink>
                <FooterLink to="/">{t("footer.services.library")}</FooterLink>
                <FooterLink to="/">
                  {t("footer.services.procurement")}
                </FooterLink>
                <FooterLink to="/">
                  {t("footer.services.jobsAtEscwa")}
                </FooterLink>
                <FooterLink to="/">
                  {t("footer.services.escwaTechnologyCenter")}
                </FooterLink>
              </FooterLinkItems>
            </FooterLinksWrapper>
          </FooterLinksContainer>
          <SocialMedia>
            <SocialMediaWrap>
              <SocialLogo to="#">
                <img
                  width="70"
                  height="70"
                  src="/images/logo.png"
                  alt="Footer Logo"
                />
              </SocialLogo>
              <WebsiteRights>
                ACU Helpdesk &copy; {new Date().getFullYear()}
                &nbsp; All rights reserved
              </WebsiteRights>
              <SocialIcons>
                <SocialIconLink
                  href="https://www.facebook.com/unescwa"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.facebook.com/unescwa"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.youtube.com/user/UNESCWA"
                  target="_blank"
                  aria-label="Youtube"
                >
                  <FaYoutube />
                </SocialIconLink>
                <SocialIconLink
                  href="https://twitter.com/UNESCWA"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.linkedin.com/company/unescwa/"
                  target="_blank"
                  aria-label="Linkedin"
                >
                  <FaLinkedin />
                </SocialIconLink>
              </SocialIcons>
            </SocialMediaWrap>
          </SocialMedia>
        </FooterWrap>
      </FooterContainer>
    </>
  );
};

export default Footer;
